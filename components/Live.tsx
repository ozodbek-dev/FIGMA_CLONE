import React, { PointerEvent, useCallback, useEffect, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState } from "@/types/type";

function Live() {
	const others = useOthers();
	const [cursorState, setCursorState] = useState<CursorState>({
		mode: CursorMode.Hidden,
	});
	const [{ cursor }, updateMyPresence] = useMyPresence() as any;

	const handlePointerMove = useCallback((e: PointerEvent) => {
		e.preventDefault();
		const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
		const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
		updateMyPresence({ cursor: { x, y } });
	}, []);

	const handlePointerLeave = useCallback((e: PointerEvent) => {
		setCursorState({ mode: CursorMode.Hidden });
		updateMyPresence({ cursor: null, message: null });
	}, []);

	const handlePointerDown = useCallback((e: PointerEvent) => {
		e.preventDefault();
		const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
		const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
		updateMyPresence({ cursor: { x, y } });
	}, []);

	useEffect(() => {
		const onKeyUp = (e: KeyboardEvent) => {
			if (e.key === "/") {
				setCursorState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
			} else if (e.key === "Escape") {
				updateMyPresence({ message: "" });
				setCursorState({ mode: CursorMode.Hidden });
			}
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "/") {
				e.preventDefault();
			}
    };
    
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
	}, [updateMyPresence]);

	return (
		<div
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			onPointerDown={handlePointerDown}
			className='border-2 border-green-500 h-[100vh] w-full flex justify-center items-center text-center'
		>
			<h1 className='text-2xl  text-white'>Live Blocks Figma Clone</h1>
			{cursor && (
				<CursorChat
					cursor={cursor}
					cursorState={cursorState}
					setCursorState={setCursorState}
					updateMyPresence={updateMyPresence}
				/>
			)}
			<LiveCursors others={others} />
		</div>
	);
}

export default Live;
