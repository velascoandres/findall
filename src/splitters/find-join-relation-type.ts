import {JOIN_KEYWORD} from '../constants/query-operators';
import { FindFullQueryBody } from '../interfaces/find-full-query-body';

export function findJoinRelationType(
    subQueryObject: FindFullQueryBody,
): 'inner' | 'left' {
    const existsRelation = !!subQueryObject[JOIN_KEYWORD];
    if (existsRelation) {
        return subQueryObject[JOIN_KEYWORD] as 'left';
    } else {
        return 'inner';
    }
}