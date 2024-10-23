import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KanbanColumn from './components/KanbanColumn';
import { fetchTickets } from './services/apiService';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [sorting, setSorting] = useState('priority'); // Default sorting by priority

  // Load initial state from sessionStorage
  useEffect(() => {
    const savedGrouping = sessionStorage.getItem('grouping');
    const savedSorting = sessionStorage.getItem('sorting');
    const savedTickets = sessionStorage.getItem('tickets');

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
    if (savedSorting) {
      setSorting(savedSorting);
    }
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets)); // Restore tickets
    } else {
      // If no tickets are saved, fetch them from the API
      const getTicketsAndUsers = async () => {
        const data = await fetchTickets();
        console.log(data.tickets);
        setTickets(data.tickets);
        setUsers(data.users);
      };
      getTicketsAndUsers();
    }
  }, []);

  // Save the grouping, sorting, and tickets to sessionStorage when they are updated
  useEffect(() => {
    sessionStorage.setItem('grouping', grouping);
    sessionStorage.setItem('sorting', sorting);
    sessionStorage.setItem('tickets', JSON.stringify(tickets));
  }, [grouping, sorting, tickets]);

  const groupBy = (tickets, key) => {
    return tickets.reduce((result, ticket) => {
      const groupKey = key === 'user' ? ticket.userId : ticket[key];
      (result[groupKey] = result[groupKey] || []).push(ticket);
      return result;
    }, {});
  };

  const sortTickets = (tickets, key) => {
    return [...tickets].sort((a, b) => (a[key] > b[key] ? 1 : -1));
  };

  const findUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const enrichedTickets = tickets.map(ticket => ({
    ...ticket,
    user: findUserName(ticket.userId),
  }));

  const sortedTickets = sortTickets(enrichedTickets, sorting);
  const groupedTickets = groupBy(sortedTickets, grouping);

  // handle adding a new card
  const handleAddCard = (group, title, value) => {
    let newTicket = {};

    if (grouping === 'priority') {
      newTicket = {
        id: `CAM-${tickets.length + 1}`, // Generate a new unique ID
        title: title,
        userId: 'usr-1',
        status: 'Todo',
        priority: value,
      };
    } else if (grouping === 'user') {
      newTicket = {
        id: `CAM-${tickets.length + 1}`,
        title: title,
        userId: group,
        status: 'Todo',
        priority: 2,
      };
    } else if (grouping === 'status') {
      newTicket = {
        id: `CAM-${tickets.length + 1}`,
        title: title,
        userId: 'usr-1',
        status: value,
        priority: 2,
      };
    }

    setTickets([...tickets, newTicket]);
  };


  const getDefaultGroups = () => {
    if (grouping === 'status') {
      return ['Todo', 'In progress', 'Done', 'Cancelled', 'Backlog'];
    }
    if (grouping === 'priority') {
      return ['0', '1', '2', '3', '4'];
    }
    if (grouping === 'user') {
      return ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'];
    }
    return [];
  };

  const getColumnTitle = (group) => {
    if (grouping === 'user') {
      const user = users.find((u) => u.id === group);
      return user ? user.name : 'Unknown User';
    }
    return group;
  };

  const columns = getDefaultGroups().map((group) => ({
    group,
    tickets: groupedTickets[group] || [],
  }));

  return (
    <>
      <Header
        onGroupingChange={setGrouping}
        onSortingChange={setSorting}
        grouping={grouping}
        sorting={sorting}
      />
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.group}
            title={getColumnTitle(column.group, column.tickets.length)} // Set column title dynamically based on grouping
            tickets={column.tickets}
            onAddCard={handleAddCard}
            grouping={grouping}
          />
        ))}
      </div>
    </>
  );
};

export default App;
