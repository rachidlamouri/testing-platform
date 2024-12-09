import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraphElement } from '../../programmable-units/graph-visualization/directed-graph/element/directedGraphElement';
import { Skill } from './skill';

export type Item = Skill;

type NewType = DirectedGraphElement;

type InteractableInput = {
  item: Item;
  element: NewType;
};

/**
 * A graph element tied to a concept
 */
export class Interactable implements InteractableInput {
  get id(): Item['id'] {
    return this.item.id;
  }

  item: Item;

  element: DirectedGraphElement;

  constructor(input: InteractableInput) {
    this.item = input.item;
    this.element = input.element;
  }
}

export const INTERACTABLE_COLLECTION_ID = 'interactable';

type InteractableCollectionId = typeof INTERACTABLE_COLLECTION_ID;

export type InteractableStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    InteractableCollectionId,
    Interactable
  >;
