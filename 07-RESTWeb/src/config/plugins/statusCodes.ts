import { StatusCodes } from 'http-status-codes';

export class Status {
  static get OK(): number {
    return StatusCodes.OK;
  }

  static get NOT_FOUND(): number {
    return StatusCodes.NOT_FOUND;
  }

  static get BAD_REQUEST(): number {
    return StatusCodes.BAD_REQUEST;
  }

  static get CREATED(): number {
    return StatusCodes.CREATED;
  }
}
