function Modal({onConfirm, onCancel}: { onConfirm: () => void, onCancel: () => void }) {


    return (
        <div className="fixed flex items-center justify-center  h-screen w-screen top-0 left-0 bg-[rgba(0,0,0,.3)]">
            <div className="bg-neutral-content p-4 rounded-md flex gap-2 flex-col">
                <h3 className="font-bold text-xl">Delete this book?</h3>
                <form method="dialog" className="flex gap-2">
                    <button className="btn btn-error" onClick={onConfirm}>Yes, delete</button>
                    <button className="btn btn-success" onClick={onCancel}>No</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;
