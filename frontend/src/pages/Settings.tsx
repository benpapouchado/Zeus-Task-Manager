export default function Settings() {
    return (
        <main>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">Settings</h1>
                    </div>
                </div>
            </div>

            <div className="box column is-flex-grow-1 has-text-left is-two-thirds m-3 p-3" >
                <header className="is-size-4 m-3"><strong>Profile</strong></header>
                <span className="is-size-4 m-3 ">Display Name</span>
                <div className="m-3">
                    <input className="input"
                        type="text"
                        placeholder="Your name" />
                </div>
            </div>

            <div className="box column is-flex-grow-1 has-text-left is-two-thirds m-3 p-3" >
                <header className="is-size-4 m-3"><strong>Appearance</strong></header>
                <span className="is-size-5 m-3 ">Dark Mode</span> <br />
                <span className="m-3">Use a darker colour scheme across the app</span>
                <div className="control m-3">
                    <label className="radio m-3">
                        <input type="radio" name="answer" />
                        Light
                    </label>
                    <label className="radio m-3">
                        <input type="radio" name="answer" />
                        Dark
                    </label>
                </div>
            </div>

            <button
                className="button is-rounded align-right"
                style={{
                    color: "white",
                    backgroundColor: "#7e1212",
                }}>Save Changes</button>

        </main>
    );
}