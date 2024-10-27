import { Schedule } from '../interface/schedule';
import { ScheduleDto } from '../dto/scheduleDto';
import { schedules } from '../mocks/schedulesData';

export const create = async (scheduleDto: ScheduleDto): Promise<Schedule> => {
  const schedule: Schedule = {
    ...scheduleDto,
    id: schedules.length + 1,
  };

  schedules.push(schedule);

  return schedule;
};

export const getAll = async (): Promise<Schedule[]> => {
  return schedules;
};
