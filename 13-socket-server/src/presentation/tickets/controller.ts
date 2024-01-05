import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  public getTickets = async (req: Request, res: Response) => {
    res.json({ tickets: this.ticketService.allTickets });
  };

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json({ number: this.ticketService.lastTicketNumber() });
  };

  public pendingTickets = async (req: Request, res: Response) => {
    res.json('pendingTickets');
  };

  public createTicket = async (req: Request, res: Response) => {
    res.json('createTicket');
  };

  public drawTicket = async (req: Request, res: Response) => {
    res.json('drawTicket');
  };

  public ticketFinished = async (req: Request, res: Response) => {
    res.json('ticketFinished');
  };

  public workingOn = async (req: Request, res: Response) => {
    res.json('workingOn');
  };
}
