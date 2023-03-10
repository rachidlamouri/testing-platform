import { digikikify } from '../../core/digikikify';
import { eventDebuggerEstinant } from '../core/debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { fileAMentursection } from './file/fileAMentursection';
import { fileAEstinant } from './file/fileA';
import { SIMPLE_FILE_A_CONFIGURATION_QUIRM } from './file/fileAConfiguration';
import { typeScriptFileBEstinant } from './file/typeScriptFileB';
import { typeScriptFileCEstinant } from './file/typeScriptFileC';
import { identifiableQuirmDebuggerEstinant } from '../../custom-adapter/identifiableQuirmDebuggerEstinant';
import { typeScriptFileD2Estinant } from './program/typeScriptFileD2';
import { programFileAEstinant } from './program/programFileA';
import { programFileBEstinant } from './program/programFileB';
import { programFileRendererEstinant } from './program/programFileRendererEstinant';
import {
  programFileC2Estinant1,
  programFileC2Estinant2,
} from './program/programFileC2';

digikikify({
  initialQuirmTuple: [SIMPLE_FILE_A_CONFIGURATION_QUIRM],
  estinantTuple: [
    identifiableQuirmDebuggerEstinant,
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    fileAEstinant,
    fileAMentursection,
    typeScriptFileBEstinant,
    typeScriptFileCEstinant,
    typeScriptFileD2Estinant,
    programFileAEstinant,
    programFileBEstinant,
    programFileRendererEstinant,
    programFileC2Estinant1,
    programFileC2Estinant2,
  ],
});

// TODO: figure out how to not have to do this
export type ExampleCustom = symbol;
