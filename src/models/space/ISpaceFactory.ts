import { Space } from './Space';

export interface ISpaceFactory {
    create(data: Partial<Space>): Space;
}
