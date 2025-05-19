import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './App.css';
import ThemeControler from './components/ThemeControler';

function App() {
    const [greetMsg, setGreetMsg] = useState('');
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    async function greet() {
        if (name !== '') {
            setGreetMsg(await invoke('greet', { name }));
            setName('');
        }

        inputRef.current?.focus();
    }

    async function submit(e: FormEvent) {
        e.preventDefault();
        try {
            await greet();
        } catch (e) {
            console.error(e);
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    return (
        <div>
            <section className="navbar bg-base-200 shadow-sm mb-8">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Tauri App</a>
                </div>
                <div className="flex-none">
                    <ThemeControler />
                </div>
            </section>
            <main className="flex flex-col justify-center items-center">
                <h1 className="mb-8 text-4xl">Welcome to Tauri + React</h1>

                <form
                    className="flex flew-row justify-center gap-4 w-screen"
                    onSubmit={submit}
                >
                    <input
                        className="input input-primary"
                        ref={inputRef}
                        value={name}
                        onChange={onInputChange}
                        placeholder="Enter a name..."
                    />
                    <button className="btn btn-primary" type="submit">
                        Greet
                    </button>
                </form>
                <p className="mt-8">{greetMsg}</p>
            </main>
        </div>
    );
}

export default App;
