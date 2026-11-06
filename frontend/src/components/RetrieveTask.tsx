import type { Task } from "../type/Type";

const API_URL = import.meta.env.VITE_API_URL;

type Search = {
    searchId: string | null;
    setSearchId: (value: number | null) => void;
    setSelectedFilterButton: (filterButton: string | null) => void;
    setSearchResult: (task: Task | null) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function FetchTaskById({ searchId, setSearchId, setSelectedFilterButton, setSearchResult, setError }: Search) {

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
                setError("4");
                setSearchResult(null);
                return;
            }
        
            const data : Task = await response.json();
            setSearchResult(data);
            setError(null);
            setSelectedFilterButton("All");              
            

        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError("4");
            setSearchResult(null);
        }
    };

    const clearSearch = () => {
        setSearchId(null);
        setSearchResult(null);
        setError(null);
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