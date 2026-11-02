import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
};

type Search = {
    searchId: string | null;
    setSearchId: (value: number | null) => void;
    setSelectedFilterButton: (filterButton: string | null) => void;
    searchResult: Task | null;
    setSearchResult: (task: Task | null) => void;
}

export function FetchTaskById({ searchId, setSearchId, setSelectedFilterButton, searchResult, setSearchResult }: Search) {

    const fetchTaskById = async () => {
        const id = Number(searchId?.trim());
        try {
            const response = await fetch(`${API_URL}/api/tasks/retrieve/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.ok) {
            const data : Task = await response.json();
            setSearchResult(data);
            setSelectedFilterButton("All");              
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const clearSearch = () => {
        setSearchId(null);
        setSearchResult(null);
    };

    return (
        <div className="column is-narrow">
            <div className="field has-addons">
                <p className="control">
                    <input
                        value={searchId ?? ''}
                        className="input"
                        type="text"
                        placeholder="Enter Task Id"
                        onChange={(e) => setSearchId(Number(e.target.value) || null)}
                    />
                </p>
                <p className="control">
                        <button className="button"
                        disabled={!searchId?.trim()}
                            onClick={() => {
                                fetchTaskById();
                                setSelectedFilterButton("All");
                            }}
                        >Search</button>
                </p>

                <p className="control">
                    <button className="button"
                        onClick={clearSearch}
                    >Clear</button>
                </p>
            </div>
        </div>
    );
}