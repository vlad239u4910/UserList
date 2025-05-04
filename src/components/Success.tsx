import { FC } from "react";

type SuccessProps = {
  count: number;
};

export const Success: FC<SuccessProps> = ({ count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Successfully!</h3>
      <p>
        Invition sent to {count} user{count > 1 ? "s" : ""}.
      </p>
      <button
        className="send-invite-btn"
        onClick={() => window.location.reload()}
      >
        Back
      </button>
    </div>
  );
};
