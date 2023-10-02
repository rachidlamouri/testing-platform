/* eslint-disable no-underscore-dangle */
import { assertNotNull } from '../../nil/assertNotNull';
import { TextTransform } from './textTransform';

type BufferNode = {
  nextNode: BufferNode | null;
  text: string;
};

type BufferTracker = {
  start: BufferNode;
  end: BufferNode;
  size: number;
};

const MAX_BUFFER_ENTRIES = 50;

/**
 * A node stream transform that can interrupt a stream of data. It also caches
 * the data while it is marked as invisbile (up to some limit). This transform
 * should be applied first so that all other transforms don't run when a
 * subprocess stream is turned off
 */
export class Valve extends TextTransform {
  private _isVisible = true;

  private isFlushingBuffer = false;

  private bufferTracker: BufferTracker | null = null;

  constructor() {
    super({
      onTransform: (text): string | null => {
        if (!this.isFlushingBuffer) {
          this.buffer(text);
        }

        if (this.isVisible) {
          return text;
        }

        return null;
      },
    });
  }

  public bypassBuffer(text: string): void {
    this.isFlushingBuffer = true;
    this.write(text);
    this.isFlushingBuffer = false;
  }

  private buffer(text: string): void {
    const node: BufferNode = {
      nextNode: null,
      text,
    };

    if (this.bufferTracker === null) {
      this.bufferTracker = {
        start: node,
        end: node,
        size: 1,
      };

      return;
    }

    this.bufferTracker.end.nextNode = node;

    if (this.bufferTracker.size < MAX_BUFFER_ENTRIES) {
      this.bufferTracker = {
        start: this.bufferTracker.start,
        end: node,
        size: this.bufferTracker.size + 1,
      };

      return;
    }

    assertNotNull(this.bufferTracker.start.nextNode);
    this.bufferTracker = {
      start: this.bufferTracker.start.nextNode,
      end: node,
      size: this.bufferTracker.size,
    };
  }

  private flushBuffer(): void {
    if (this.bufferTracker === null) {
      return;
    }

    this.isFlushingBuffer = true;

    this.write('RESUMING\n');

    let iterator: BufferNode | null = this.bufferTracker.start;
    while (iterator !== null) {
      this.write(iterator.text);
      iterator = iterator.nextNode;
    }

    this.isFlushingBuffer = false;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(isVisible: boolean) {
    const wasVisible = this._isVisible;

    this._isVisible = isVisible;

    if (!wasVisible && isVisible) {
      this.flushBuffer();
    }
  }
}
/* eslint-enable no-underscore-dangle */
