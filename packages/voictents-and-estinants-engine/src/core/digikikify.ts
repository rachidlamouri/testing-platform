import fs from 'fs';
import { text } from 'cheerio/lib/api/manipulation';
import { map } from 'cheerio/lib/api/traversing';
import { Zorn, ZornTuple } from '../utilities/semantic-types/zorn';
import { Ajorken } from './ajorken';
import { Appreffinge, getIsWibiz } from './appreffinge';
import { Cology, CologySet, getCologyEntryList } from './cology';
import {
  Dreanor,
  DreanorTypeName,
  LeftDreanor,
  RightDreanor,
  RightVoictentDreanor,
  RightVoictentItemDreanor,
} from './dreanor';
import { Estinant, EstinantTuple } from './estinant';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import {
  Lanbe,
  LanbeTypeName,
  VoictentItemLanbe,
  VoictentLanbe,
} from './lanbe';
import { Mabz, MabzEntry } from './mabz';
import { Platomity, getDreanorTuple } from './platomity';
import { Prected } from './prected';
import { Procody } from './procody';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';
import { Tuple } from '../utilities/semantic-types/tuple';

export type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
  estinantTuple: EstinantTuple;
  onHubblepupAddedToVoictents: OnHubblepupAddedToVoictentsHandler;
};

/**
 * A pipes and filters engine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart the engine
 */
export const digikikify = ({
  initialQuirmTuple,
  estinantTuple,
  onHubblepupAddedToVoictents,
}: DigikikifierInput): void => {
  const tabilly = new Tabilly();

  const addToTabilly = (quirmTuple: QuirmTuple): void => {
    tabilly.addHubblepupsToVoictents(quirmTuple);

    quirmTuple.forEach((quirm) => {
      onHubblepupAddedToVoictents(quirm);
    });
  };

  const createLanbe = (estinant: Estinant, appreffinge: Appreffinge): Lanbe => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(appreffinge.gepp);
    const lanbe = getIsWibiz(appreffinge)
      ? voictent.createVoictentLanbe(estinant.tropoig.name)
      : voictent.createVoictentItemLanbe(estinant.tropoig.name);
    return lanbe;
  };

  const platomityList = estinantTuple.map<Platomity>((estinant) => {
    const { leftAppreffinge, rightAppreffingeTuple } = estinant;

    const leftDreanor: LeftDreanor = {
      typeName: DreanorTypeName.LeftDreanor,
      gepp: leftAppreffinge.gepp,
      lanbe: createLanbe(estinant, leftAppreffinge),
    };

    const rightDreanorTuple = rightAppreffingeTuple.map<RightDreanor>(
      (rightAppreffinge) => {
        if (getIsWibiz(rightAppreffinge)) {
          return {
            typeName: DreanorTypeName.RightVoictentDreanor,
            gepp: rightAppreffinge.gepp,
            lanbe: createLanbe(estinant, rightAppreffinge) as VoictentLanbe,
            isReady: false,
          } satisfies RightVoictentDreanor;
        }
        return {
          typeName: DreanorTypeName.RightVoictentItemDreanor,
          gepp: rightAppreffinge.gepp,
          lanbe: createLanbe(estinant, rightAppreffinge) as VoictentItemLanbe,
          framate: rightAppreffinge.framate,
          croard: rightAppreffinge.croard,
          prected: new Prected(),
        } satisfies RightVoictentItemDreanor;
      },
    );

    const platomity: Platomity = {
      estinant,
      leftDreanor,
      rightDreanorTuple,
      procody: new Procody(),
      runCount: 0,
    };

    return platomity;
  });

  const canPlatomityAdvanceNow = (platomity: Platomity): boolean => {
    return getDreanorTuple(platomity).some((dreanor) =>
      dreanor.lanbe.hasNext(),
    );
  };

  const couldPlatomityAdvance = (platomity: Platomity): boolean => {
    if (platomity.estinant.name === 'getRootDirectedGraph') {
      console.log(
        getDreanorTuple(platomity).map((dreanor) => {
          if (dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe) {
            return dreanor.lanbe.hasNext() || dreanor.lanbe.willHaveNext();
          }

          return dreanor.lanbe.hasNext();
        }),
      );
    }

    return getDreanorTuple(platomity).some((dreanor) => {
      if (dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe) {
        return dreanor.lanbe.hasNext() || dreanor.lanbe.willHaveNext();
      }

      return dreanor.lanbe.hasNext();
    });
  };

  const executePlatomity = (
    platomity: Platomity,
    dreanorTuple: Tuple<Dreanor>,
  ): void => {
    const touchedCologySet = new CologySet();

    if (platomity.estinant.name === 'getTypeScriptFileInstanceIdByFilePath') {
      console.log(
        'ON EXECUTE  ',
        getDreanorTuple(platomity).map(({ lanbe }) => lanbe.hasNext()),
      );
    }

    dreanorTuple.forEach((dreanor) => {
      dreanor.lanbe.advance();

      if (dreanor.typeName === DreanorTypeName.LeftDreanor) {
        const leftInput = dreanor.lanbe.dereference() as
          | Hubblepup
          | HubblepupTuple;

        const mabzEntryList = platomity.rightDreanorTuple.map<MabzEntry>(
          (rightDreanor) => {
            let zornTuple: ZornTuple;
            if (
              rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
            ) {
              zornTuple = [rightDreanor.lanbe];
            } else {
              zornTuple = rightDreanor.framate(leftInput);
            }

            return [rightDreanor.gepp, zornTuple];
          },
        );

        const cology: Cology = {
          leftGepp: dreanor.gepp,
          leftInput,
          mabz: new Mabz(mabzEntryList),
        };

        getCologyEntryList(cology).forEach(([gepp, zorn]) => {
          const ajorken = platomity.procody.get(gepp) ?? new Ajorken();
          const cologySet = ajorken.get(zorn) ?? new CologySet();

          cologySet.add(cology);
          ajorken.set(zorn, cologySet);
          platomity.procody.set(gepp, ajorken);
        });

        touchedCologySet.add(cology);
      } else {
        let rightInput;
        let zorn: Zorn;
        if (dreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
          rightInput = dreanor.lanbe.dereference() as HubblepupTuple;
          zorn = dreanor.lanbe;
          // eslint-disable-next-line no-param-reassign
          dreanor.isReady = true;
        } else {
          rightInput = dreanor.lanbe.dereference() as Hubblepup;
          zorn = dreanor.croard(rightInput);
          dreanor.prected.set(zorn, rightInput);
        }

        const ajorken = platomity.procody.get(dreanor.gepp) ?? new Ajorken();
        const cologySet = ajorken.get(zorn) ?? new CologySet();

        [...cologySet].forEach((cology) => {
          touchedCologySet.add(cology);
        });
      }
    });

    const readyCologies = [...touchedCologySet].filter((cology) => {
      const isReady = platomity.rightDreanorTuple.every(
        (rightDreanor: RightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            return rightDreanor.isReady;
          }

          const zornTuple = cology.mabz.get(rightDreanor.gepp) as ZornTuple;
          return zornTuple.every((zorn) => rightDreanor.prected.has(zorn));
        },
      );

      return isReady;
    });

    if (platomity.estinant.name === 'test-thingy') {
      console.log({
        touched: touchedCologySet.size,
        ready: readyCologies.length,
      });
    }

    readyCologies.forEach((cology) => {
      const { leftInput } = cology;

      const rightInputTuple = platomity.rightDreanorTuple.map<HubblepupTuple>(
        (rightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            const rightInput =
              rightDreanor.lanbe.dereference() as HubblepupTuple;
            return rightInput;
          }

          const zornTuple = cology.mabz.get(rightDreanor.gepp) as ZornTuple;
          const rightInput = zornTuple.map(
            (zorn) => rightDreanor.prected.get(zorn) as Hubblepup,
          );
          return rightInput;
        },
      );

      const outputQuirmTuple = platomity.estinant.tropoig(
        leftInput,
        ...rightInputTuple,
      );

      // eslint-disable-next-line no-param-reassign
      platomity.runCount += 1;

      addToTabilly(outputQuirmTuple);
    });
  };

  addToTabilly(initialQuirmTuple);

  const idk = [...tabilly.entries()].map(([gepp, voictent]) => {
    const lanbe1 = voictent.createVoictentLanbe('engine');
    const lanbe2 = voictent.createVoictentItemLanbe('engine');
    const list1: string[] = [];
    const list2: string[] = [];

    return {
      gepp,
      voictent,
      lanbe1,
      lanbe2,
      list1,
      list2,
      sortValue: -1,
    };
  });

  const idk2 = platomityList.map((platomity, index) => {
    const stuff = getDreanorTuple(platomity).map(({ gepp, lanbe }) => {
      const list: string[] = [];
      return {
        gepp,
        lanbe,
        list,
      };
    });

    return {
      name: platomity.estinant.name || `Estinant ${index}`,
      platomity,
      stuff,
      lastRunCount: 0,
      list: [] as string[],
    };
  });

  // const signals = new Map<string, boolean[]>(
  //   [...tabilly.keys()].map((gepp) => [gepp, []]),
  // );

  const T = 'X';
  const F = '-';

  const startTime = process.hrtime.bigint();

  const secondsList: bigint[] = [];

  while (platomityList.some(couldPlatomityAdvance)) {
    secondsList.push((process.hrtime.bigint() - startTime) / 1000000000n);
    [...tabilly.entries()].forEach(([gepp, voictent]) => {
      voictent.onTickStart();
    });

    idk.forEach((x) => {
      x.list1.push(x.lanbe1.hasNext() ? T : F);
      x.list2.push(x.lanbe2.hasNext() ? T : F);

      while (x.lanbe2.hasNext()) {
        x.lanbe2.advance();
      }
    });

    idk2.forEach((x) => {
      x.stuff.forEach((s) => {
        s.list.push(s.lanbe.hasNext() ? T : F);
      });
    });

    // platomityList.forEach((platomity) => {
    //   if (platomity.estinant.name === 'test-thingy') {
    //     console.log({
    //       name: platomity.estinant.name,
    //       now: canPlatomityAdvanceNow(platomity),
    //       later: couldPlatomityAdvance(platomity),
    //     });
    //   }
    // });
    // console.log();

    // platomityList.forEach((platomity) => {
    //   console.log({
    //     name: platomity.estinant.name,
    //     data: getDreanorTuple(platomity).map(({ gepp, typeName, lanbe }) => ({
    //       gepp,
    //       typeName,
    //       hasNext: lanbe.hasNext(),
    //       willHaveNext: lanbe?.willHaveNext(),
    //     })),
    //   });
    // });
    // console.log();

    platomityList
      .filter(canPlatomityAdvanceNow)
      .map((platomity) => ({
        platomity,
        dreanorTuple: getDreanorTuple(platomity).filter((dreanor) =>
          dreanor.lanbe.hasNext(),
        ),
      }))
      .forEach(({ platomity, dreanorTuple }) => {
        // console.log(platomity.estinant.name, canPlatomityAdvance(platomity));

        executePlatomity(platomity, dreanorTuple);
      });

    idk2.forEach((x) => {
      const runCountDiff = x.platomity.runCount - x.lastRunCount;
      x.lastRunCount = x.platomity.runCount;
      x.list.push(
        runCountDiff < 10
          ? runCountDiff === 0
            ? '-'
            : `${runCountDiff}`
          : 'N',
      );
    });
  }

  // console.log('Voictents:');
  // console.log(
  //   Object.fromEntries(
  //     [...tabilly.entries()].map(([gepp, voictent]) => [
  //       gepp,
  //       voictent.hubblepupTuple.length,
  //     ]),
  //   ),
  // );
  // console.log();

  // console.log('Estinants');
  // console.log(
  //   Object.fromEntries(
  //     platomityList.map((platomity, index) => {
  //       const name = platomity.estinant.name || index;
  //       return [name, platomity.runCount];
  //     }),
  //   ),
  // );
  // console.log();

  // // This must be a dowhile so that when "isWibiz" is true, it triggers for a Voictent with 1 item
  // do {
  //   [...tabilly.values()].forEach((voictent) => {
  //     voictent.onTickStart();
  //   });

  // platomityList.forEach((platomity) => {
  //   console.log({
  //     name: platomity.estinant.name,
  //     data: getDreanorTuple(platomity).map(({ gepp, typeName, lanbe }) => ({
  //       gepp,
  //       typeName,
  //       hasNext: lanbe.hasNext(),
  //     })),
  //   });
  // });
  // console.log();

  //   platomityList.filter(canPlatomityAdvanceNow).forEach((platomity) => {
  //     // console.log(platomity.estinant.name, canPlatomityAdvance(platomity));
  //     executePlatomity(platomity);
  //   });
  // } while (platomityList.some(canPlatomityAdvanceNow));

  const textList: string[] = [];

  const elapsedList = secondsList.map((seconds, index) => {
    const lastTime = secondsList[index - 1] ?? 0n;

    const elapsed = seconds - lastTime;

    if (elapsed >= 10n) {
      return 'N';
    }

    if (elapsed === 0n) {
      return '-';
    }

    return `${elapsed}`;
  });

  idk.forEach((x) => {
    const index1 = x.list1.findIndex((c) => c === T);
    const index2 = x.list2.findIndex((c) => c === T);

    const sortValue = Math.min(index1, index2);

    // eslint-disable-next-line no-param-reassign
    x.sortValue = sortValue === -1 ? Infinity : sortValue;
  });

  idk.sort((a, b) => a.sortValue - b.sortValue);
  idk.forEach((x) => {
    textList.push(x.gepp);
    textList.push(x.voictent.hubblepupTuple.length);
    textList.push(x.list2.join(''));
    textList.push(x.list1.join(''));
    textList.push('');
  });

  textList.push('');
  textList.push('');
  textList.push('');

  idk2.forEach((x) => {
    textList.push(x.name);
    x.stuff.forEach((s) => {
      textList.push(s.gepp);
      textList.push(s.list.join(''));
    });
    textList.push(x.list.map(() => '_').join(''));
    textList.push(x.list.join(''));
    textList.push(elapsedList.join(''));
    textList.push('');
  });

  console.log('out.txt');
  fs.writeFileSync('out.txt', textList.join('\n'));
};
