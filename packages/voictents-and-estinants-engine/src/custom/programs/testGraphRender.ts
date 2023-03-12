import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import { DIRECTED_GRAPH_GEPP } from '../programmable-units/graph-visualization/directed-graph/directedGraph';
import { directedGraphToGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';

digikikify({
  initialVoictentsByGepp: {
    [DIRECTED_GRAPH_GEPP]: [
      {
        zorn: 'my-graph',
        grition: {
          id: 'my graph',
          label: 'my graph',
          nodeList: [
            {
              id: 'a',
              label: 'node a',
            },
            {
              id: 'b',
              label: 'node b',
            },
          ],
          edgeList: [
            {
              tailId: 'a',
              headId: 'b',
            },
            // {
            //   tailId: 'a',
            //   headId: 'c',
            // },
          ],
          subgraphList: [
            {
              id: 'my subgraph',
              label: 'my subgraph',
              nodeList: [
                {
                  id: 'c',
                  label: 'node c',
                },
                {
                  id: 'd',
                  label: 'node d',
                },
              ],
              edgeList: [
                {
                  tailId: 'c',
                  headId: 'd',
                },
              ],
              subgraphList: [],
            },
          ],
        },
      },
    ],
  },
  estinantTuple: [directedGraphToGraphvizCode],
  onHubblepupAddedToVoictents: (output) => {
    // eslint-disable-next-line no-console
    console.log(output.hubblepup.grition, '\n---');
  },
});
