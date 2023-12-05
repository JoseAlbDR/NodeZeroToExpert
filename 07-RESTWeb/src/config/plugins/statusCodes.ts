import { StatusCodes } from 'http-status-codes';

export class Status {
  static get OK(): number {
    return StatusCodes.OK;
  }
}
