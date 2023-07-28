import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(
    owner: string,
    title: string,
    description: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({ owner, title, description });
    return newTask.save();
  }

  async findAllByOwner(owner: string): Promise<Task[]> {
    return this.taskModel.find({ owner }).exec();
  }

  async deleteById(taskId: string, owner: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({ _id: taskId, owner }).exec();
  }
}
