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
    setSearchResult: (task: Task | null) => void;
    setSearchError: (error: boolean) => void;
}

export function FetchTaskById({ searchId, setSearchId, setSelectedFilterButton, setSearchResult, setSearchError }: Search) {

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
                setSearchError(true);
                setSearchResult(null);
                return;
            }

            if (response.ok) {
            const data : Task = await response.json();
            setSearchResult(data);
            setSearchError(false);
            setSelectedFilterButton("All");              
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
            setSearchError(true);
        }
    };

    const clearSearch = () => {
        setSearchId(null);
        setSearchResult(null);
        setSearchError(false);
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