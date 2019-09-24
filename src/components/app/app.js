import React, {Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component  {

    maxId = 100;

    state = {
        items: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ],
        filter: 'all',
        search: ''
    }
    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];

        const item = { ...arr[idx], [propName]: value } ;
        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx + 1)
        ];
    };
    onToggleDone = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done');
            return { items };
        });
    };

    onToggleImportant = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'important');
            return { items };
        });
    };
    onItemAdded = (label) => {
        this.setState((state) => {
            const item = this.createItem(label);
            return { items: [...state.items, item] };
        })
    };
    createItem(label) {
        return {
            id: ++this.maxId,
            label,
            important: false,
            done: false
        };
    }

    onDelete = (id) => {
        this.setState((state) => {
            const idx = state.items.findIndex((item) => item.id === id);
            const items = [
                ...state.items.slice(0, idx),
                ...state.items.slice(idx + 1)
            ];
            return { items };
        });
    };

    render() {
        return (<div className="todo-app">
            <AppHeader toDo={1} done={3}/>
            <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter/>
            </div>

            <TodoList
                items={ this.state.items }
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                onDelete={this.onDelete} />

            <ItemAddForm
                onItemAdded={this.onItemAdded} />

        </div>)
    };
};
