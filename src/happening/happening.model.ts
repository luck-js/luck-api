import { Document, Schema, model } from 'mongoose';

export interface IHappening {
    id: string,
    name: string,
    description: string,
    isPublish: boolean,
    memberIdList: string[],
}

export interface IHappeningSchema extends IHappening, Document {
    id: string,
}

const HappeningSchema: Schema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    isPublish: {
        type: Boolean,
        required: true
    },
    memberIdList: {
        type: [String],
        required: true
    }
}, { collection: 'happening' });

export default model<IHappeningSchema>('Happening', HappeningSchema);
