import {useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";
import "./App.css";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function greet() {
        if (name !== "") {
            // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
            setGreetMsg(await invoke("greet", {name}));
            setName("");
        }
        
        inputRef.current?.focus();
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-8 text-4xl">Welcome to Tauri + React</h1>

            <form className="flex flew-row gap-4"
                  onSubmit={async (e) => {
                      e.preventDefault();
                      await greet();
                  }}
            >
                <input className="input input-primary"
                       ref={inputRef}
                       value={name}
                       onChange={(e) => setName(e.currentTarget.value)}
                       placeholder="Enter a name..."
                />
                <button className="btn btn-primary" type="submit">Greet</button>
            </form>
            <p className="mt-8">{greetMsg}</p>
        </main>
    );
}

export default App;
