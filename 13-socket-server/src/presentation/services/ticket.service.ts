import { UuidAdapter } from '../../config/uuidAdapter';
import { Ticket } from '../../domain/interfaces/ticket';

export class TicketService {
  private readonly tickets: Ticket[] = [
    {
      id: UuidAdapter.v4(),
      number: 1,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 2,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 3,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 4,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 5,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 6,
      createdAt: new Date(),
      done: false,
    },
  ];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(
      (ticket) => !ticket.handleAtDesk && !ticket.done
    );
  }

  public lastTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1) : 0;
  }

  public createTicket(): Ticket {
    const number = this.tickets.at(-1)!.number + 1;

    const ticket = {
      id: UuidAdapter.v4(),
      number,
      createdAt: new Date(),
      done: false,
    };

    return ticket;
  }
}
