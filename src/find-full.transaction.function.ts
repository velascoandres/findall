import {EntityManager, ObjectType, SelectQueryBuilder} from 'typeorm';
import {FindFullQuery} from './interfaces/find-full-query';
import {searchRecords} from './search-functions/search-records';
import {TransactionResponse} from './interfaces/transaction-response';
import {BASE_ENTITY_NAME} from './constants/query-operators';

export async function findFullTransaccion<T>(
    entityManager: EntityManager,
    entity: string,
    findFullQuery: FindFullQuery,
): Promise<TransactionResponse<[T[], number]>> {
    const currentQuery: SelectQueryBuilder<T> = entityManager.createQueryBuilder(entity, BASE_ENTITY_NAME);
    try {
        const data =  await searchRecords<T>(currentQuery, findFullQuery);
        return {
            response: data,
            entityManager,
        };
    } catch (error) {
        console.error(
            {
                error,
                message: 'Error on generate query',
                data: {
                    query: findFullQuery,
                },
            },
        );
        throw new Error(
            'Error on generate query',
        );
    }
}