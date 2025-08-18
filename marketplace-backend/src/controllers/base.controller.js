class BaseController {
    constructor(model) {
        this.model = model;
    }

    // Create a new document
    async create(data) {
        try {
            const doc = await this.model.create(data);
            return { success: true, data: doc };
        } catch (error) {
            throw error;
        }
    }

    // Get all documents with pagination and filters
    async getAll(query = {}, options = {}) {
        try {
            const {
                page = 1,
                limit = 10,
                sort = { createdAt: -1 },
                populate = '',
                select = ''
            } = options;

            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.model
                    .find(query)
                    .populate(populate)
                    .select(select)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit),
                this.model.countDocuments(query)
            ]);

            return {
                success: true,
                data,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Get a single document by ID
    async getById(id, options = {}) {
        try {
            const { populate = '', select = '' } = options;
            const doc = await this.model
                .findById(id)
                .populate(populate)
                .select(select);

            if (!doc) {
                throw new Error('Document not found');
            }

            return { success: true, data: doc };
        } catch (error) {
            throw error;
        }
    }

    // Update a document
    async update(id, data, options = {}) {
        try {
            const doc = await this.model.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true, ...options }
            );

            if (!doc) {
                throw new Error('Document not found');
            }

            return { success: true, data: doc };
        } catch (error) {
            throw error;
        }
    }

    // Delete a document
    async delete(id) {
        try {
            const doc = await this.model.findByIdAndDelete(id);

            if (!doc) {
                throw new Error('Document not found');
            }

            return { success: true, data: doc };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseController;
