import SimpleLevel, { JsonType } from '../../lib/simple-level';
import Block, { BlockJson } from '../block';

type BlockType = { toJSON(): BlockJson };

export class BlockDatabase extends SimpleLevel {
  constructor(dbPath?: string) {
    super('blocks', dbPath);
  }

  async put(key: string, value: BlockType): Promise<void> {
    return super.put(key, value);
  }

  async get(key: string): Promise<Block> {
    const json = await super.get(key);
    if (json == null) return null;
    return new Block(<BlockJson> json);
  }
}

export default BlockDatabase;