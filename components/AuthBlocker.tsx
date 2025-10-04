interface Props {
  message: string;
  redirect: string;
}

export function AuthBlockerMessage({ message, redirect = "/" }: Props) {
  return (
    <div className="w-full min-h-screen bg-base-200 flex justify-center p-5">
      <div className="flex card w-fit h-fit p-5 card-sm shadow-md bg-base-100">
        <h1 className="card-title">{message}</h1>
        <div className="card-body flex flex-row justify-center w-full gap-3">
          <a href={`/login?callbackUrl=${redirect}`}>
            <button className="flex-1 btn btn-primary">Log in</button>
          </a>
          <a href={`/signup?callbackUrl=${redirect}`}>
            <button className="flex-1 btn btn-primary">Sign Up</button>
          </a>
        </div>
      </div>
    </div>
  );
}
