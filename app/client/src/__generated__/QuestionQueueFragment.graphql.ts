/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionQueueFragment = {
    readonly id: string;
    readonly currentQuestion: number | null;
    readonly queuedQuestions: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly position: number | null;
                readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionStatsFragment" | "QuestionContentFragment">;
            };
        }> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"DndQuestionsFragment">;
    readonly " $refType": "QuestionQueueFragment";
};
export type QuestionQueueFragment$data = QuestionQueueFragment;
export type QuestionQueueFragment$key = {
    readonly " $data"?: QuestionQueueFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionQueueFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 100,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "queuedQuestions"
        ]
      }
    ]
  },
  "name": "QuestionQueueFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentQuestion",
      "storageKey": null
    },
    {
      "alias": "queuedQuestions",
      "args": null,
      "concreteType": "EventQuestionConnection",
      "kind": "LinkedField",
      "name": "__QuestionQueueFragment_queuedQuestions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventQuestionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EventQuestion",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "position",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "QuestionAuthorFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "QuestionStatsFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "QuestionContentFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DndQuestionsFragment"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();
(node as any).hash = 'd63d9f9e7e8daeea26b0fb7eba7c9892';
export default node;
