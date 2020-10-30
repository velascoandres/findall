import {getConnection, ObjectType} from 'typeorm';
import {FindFullQuery} from './interfaces/find-full-query';
import {searchRecords} from './search-functions/search-records';
import {BASE_ENTITY_NAME} from './constants/query-operators';

export async function findFull<T = any>(
    entity: ObjectType<{}> | any,
    query: FindFullQuery,
    conexion: string = 'default',
): Promise<[T[], number]> {
    const currentQuery = getConnection(conexion).createQueryBuilder(entity, BASE_ENTITY_NAME);
    try {
        return await searchRecords(currentQuery, query) as [any[], number];
    } catch (error) {
        console.error(
            {
                error,
                message: 'Error on generate query',
                data: {
                    query,
                },
            },
        );
        throw new Error(
            'Error on generate query',
        );
    }
}