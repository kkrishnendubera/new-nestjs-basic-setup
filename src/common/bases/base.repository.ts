import {
    FilterQuery,
    Model,
    ProjectionFields,
    Types,
    UpdateQuery,
} from 'mongoose';
import mongodb from 'mongodb';

export class BaseRepository<T> {
    private readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(params: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(params);
    }

    async getAllByField(params: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(params);
    }

    async getByField(params: FilterQuery<T>): Promise<T> {
        return await this.model.findOne(params);
    }

    async getById(id: Types.ObjectId | string): Promise<T> {
        return await this.model.findById(id);
    }

    async getCountByParam(params: FilterQuery<T>): Promise<number> {
        return await this.model.countDocuments(params);
    }

    async save(body: Partial<T>): Promise<T> {
        return await this.model.create(body);
    }

    async updateById(
        data: UpdateQuery<T>,
        id: string | Types.ObjectId,
    ): Promise<T> {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async getDistinctDocument(
        field: string,
        params: FilterQuery<T>,
    ): Promise<unknown[]> {
        return await this.model.distinct(field, params);
    }

    async getAllByFieldWithProjection(
        params: FilterQuery<T>,
        projection: ProjectionFields<T>,
    ): Promise<T[]> {
        return await this.model.find(params, projection);
    }

    async getByFieldWithProjection(
        params: FilterQuery<T>,
        projection: ProjectionFields<T>,
    ): Promise<T> {
        return await this.model.findOne(params, projection);
    }

    async delete(id: string | Types.ObjectId): Promise<T> {
        return await this.model.findByIdAndDelete(id);
    }

    async bulkDelete(params: FilterQuery<T>): Promise<mongodb.DeleteResult> {
        return await this.model.deleteMany(params);
    }

    async updateByField(
        data: UpdateQuery<T>,
        param: FilterQuery<T>,
    ): Promise<mongodb.UpdateResult> {
        return await this.model.updateOne(param, data, { new: true });
    }

    async updateAllByParams(
        data: UpdateQuery<T>,
        params: FilterQuery<mongodb.UpdateResult>,
    ) {
        return await this.model.updateMany(params, { $set: data }, { new: true });
    }

    async bulkDeleteSoft(
        ids: Types.ObjectId[] | string[],
    ): Promise<mongodb.UpdateResult> {
        return await this.model.updateMany(
            { _id: { $in: ids } },
            { $set: { isDeleted: true } },
            { multi: true },
        );
    }

    async saveOrUpdate(
        data: UpdateQuery<T>,
        id: string | Types.ObjectId = undefined,
    ): Promise<T> {
        const isExists = await this.model.findById(id);
        if (isExists)
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        return await this.model.create(data);
    }
}
