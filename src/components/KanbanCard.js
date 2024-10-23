import React from 'react';
import Todoimg from '../icons_FEtask/To-do.svg';
import Doneimg from '../icons_FEtask/Done.svg';
import Backlogimg from '../icons_FEtask/Backlog.svg';
import Cancelledimg from '../icons_FEtask/Cancelled.svg';
import Inprogressimg from '../icons_FEtask/in-progress.svg';

const KanbanCard = ({ ticket, grouping }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Todo':
                return <img src={Todoimg} alt="Todo Icon" />;
            case 'In progress':
                return <img src={Inprogressimg} alt="In Progress Icon" />;
            case 'Done':
                return <img src={Doneimg} alt="Done Icon" />;
            case 'Cancelled':
                return <img src={Cancelledimg} alt="Cancelled Icon" />;
            case 'Backlog':
                return <img src={Backlogimg} alt="Backlog Icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="kanban-card">
            <div className="card-header">
                <p>{ticket.id}</p>
                <div className="card-title">
                    {/* Show status icon next to the title only if grouping is 'user' or 'priority' */}
                    {(grouping === 'user' || grouping === 'priority') && getStatusIcon(ticket.status)}
                    <h4>{ticket.title}</h4>
                </div>
            </div>

            <p className="ticket-tag">
                {ticket.tag && ticket.tag.length > 0 ? ticket.tag[0] : "No tag"}
            </p>
        </div>
    );
};

export default KanbanCard;
