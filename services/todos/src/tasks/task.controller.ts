import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { TaskCreateDto } from './dto/task.create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('bearer'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Task' })
  @ApiBody({ type: () => TaskCreateDto })
  @Post('/create')
  async createTask(@Req() req, @Body() payload: TaskCreateDto) {
    const owner = req.user.id;
    const { title, description } = payload;
    return this.taskService.create(owner, title, description);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Tasks for owner' })
  @Get('/get')
  async getAllTasks(@Req() req) {
    const owner = req.user.id;
    return this.taskService.findAllByOwner(owner);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Tasks' })
  @Delete('/delete/:id')
  async deleteTask(@Req() req, @Param('id') taskId: string) {
    const owner = req.user.id;
    return this.taskService.deleteById(taskId, owner);
  }
}
