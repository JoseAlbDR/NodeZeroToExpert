import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  public getTickets = async (req: Request, res: Response) => {
    res.json({ tickets: this.ticketService.allTickets });
  };

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json({ number: this.ticketService.lastTicketNumber });
  };

  public pendingTickets = async (req: Request, res: Response) => {
    res.json({ tickets: this.ticketService.pendingTickets });
  };

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json({ ticket: this.ticketService.createTicket() });
  };

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;
    res.json({ ticket: this.ticketService.drawTicket(desk) });
  };

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    res.json(this.ticketService.onFinishedTicket(ticketId));
  };

  public workingOn = async (req: Request, res: Response) => {
    res.json({ ticket: this.ticketService.lastWorkingOnTickets });
  };
}
