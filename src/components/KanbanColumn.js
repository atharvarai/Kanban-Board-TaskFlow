import React, { useState } from 'react';
import KanbanCard from './KanbanCard';
import Addimg from '../icons_FEtask/add.svg';
import Dotimg from '../icons_FEtask/3 dot menu.svg';

import Todoimg from '../icons_FEtask/To-do.svg';
import Doneimg from '../icons_FEtask/Done.svg';
import Backlogimg from '../icons_FEtask/Backlog.svg';
import Cancelledimg from '../icons_FEtask/Cancelled.svg';
import Inprogressimg from '../icons_FEtask/in-progress.svg';

import Noprimg from '../icons_FEtask/No-priority.svg';
import Lowprimg from '../icons_FEtask/Img - Low Priority.svg';
import Medprimg from '../icons_FEtask/Img - Medium Priority.svg';
import Highprimg from '../icons_FEtask/Img - High Priority.svg';
import Urgentprimg from '../icons_FEtask/SVG - Urgent Priority colour.svg';

import Accountimg from '../icons_FEtask/account.png';


const KanbanColumn = ({ title, tickets, onAddCard, grouping, onClearColumn }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardValue, setNewCardValue] = useState(grouping === 'priority' ? 1 : 'Todo'); // Default value based on grouping

    const handleAddCardClick = () => {
        setFormVisible(true);
    };

    const handleAddCardSubmit = (e) => {
        e.preventDefault();
        onAddCard(title, newCardTitle, newCardValue);
        setFormVisible(false);
        setNewCardTitle(''); // Reset form values
        setNewCardValue(grouping === 'priority' ? 1 : 'Todo'); // Reset form value based on grouping
    };

    const handleDotClick = (e) => {
        e.preventDefault();
        setMenuVisible(!isMenuVisible);
    };

    return (
        <div className="kanban-column">
            <div className="kanban-column-header">
                <div className="leftCol">
                    {grouping === 'status' && (
                        <>
                            {title === "Todo" && <img src={Todoimg} alt="Todo Img" />}
                            {title === "Cancelled" && <img src={Cancelledimg} alt="Cancelled Img" />}
                            {title === "Backlog" && <img src={Backlogimg} alt="Backlog Img" />}
                            {title === "Done" && <img src={Doneimg} alt="Done Img" />}
                            {title === "In progress" && <img src={Inprogressimg} alt="In Progress Img" />}
                            <h3 className='heading1'>{title}</h3>
                            <h3 className='heading2'>{tickets.length}</h3>
                        </>
                    )}

                    {grouping === 'priority' && (
                        <>
                            {title === "4" && <img src={Urgentprimg} alt="Urgent Priority Img" />}
                            {title === "3" && <img src={Highprimg} alt="High Priority Img" />}
                            {title === "2" && <img src={Medprimg} alt="Med Priority Img" />}
                            {title === "1" && <img src={Lowprimg} alt="Low Priority Img" />}
                            {title === "0" && <img src={Noprimg} alt="No Priority Img" />}

                            {title === "4" && <h3 className='heading1'>Urgent</h3>}
                            {title === "3" && <h3 className='heading1'>High</h3>}
                            {title === "2" && <h3 className='heading1'>Medium</h3>}
                            {title === "1" && <h3 className='heading1'>Low</h3>}
                            {title === "0" && <h3 className='heading1'>No Priority</h3>}
                            <h3 className='heading2'>{tickets.length}</h3>
                        </>
                    )}

                    {grouping === 'user' && (
                        <>
                            <img src={Accountimg} alt="Profile Img" width={"20px"} height={"20px"} />
                            <h3 className='heading1'>{title}</h3>
                        </>
                    )}
                </div>

                <div className="rightCol">
                    <button className="add-card-button" onClick={handleAddCardClick}><img src={Addimg} alt="Add Img" /></button>
                    <div className="dropdown-container">
                        <button className="dot-button" onClick={handleDotClick}><img src={Dotimg} alt="Dot Img" /></button>
                    </div>
                </div>
            </div>

            <div className="kanban-cards">
                {tickets.map(ticket => (
                    <KanbanCard key={ticket.id} ticket={ticket} grouping={grouping} />
                ))}

                {/* Form to Add New Card */}
                {isFormVisible && (
                    <form className="add-card-form" onSubmit={handleAddCardSubmit}>
                        <input
                            type="text"
                            placeholder="Enter card title"
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            required
                        />
                        {grouping === 'priority' && (
                            <select
                                value={newCardValue}
                                onChange={(e) => setNewCardValue(parseInt(e.target.value, 10))}
                            >
                                <option value="4">Urgent</option>
                                <option value="3">High</option>
                                <option value="2">Medium</option>
                                <option value="1">Low</option>
                                <option value="0">No priority</option>
                            </select>
                        )}

                        {grouping === 'status' && (
                            <select
                                value={newCardValue}
                                onChange={(e) => setNewCardValue(e.target.value)}
                            >
                                <option value="Todo">Todo</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Backlog">Backlog</option>
                            </select>
                        )}

                        {grouping === 'user' && (
                            <select
                                value={newCardValue}
                                onChange={(e) => setNewCardValue(e.target.value)}
                            >
                                {/* List users dynamically */}
                                <option value="usr-1">Anoop Sharma</option>
                                <option value="usr-2">Yogesh</option>
                                <option value="usr-3">Shankar Kumar</option>
                                <option value="usr-4">Ramesh</option>
                                <option value="usr-5">Suresh</option>
                            </select>
                        )}

                        <button type="submit">Add</button>
                    </form>
                )}
            </div>
        </div >
    );
};

export default KanbanColumn;
