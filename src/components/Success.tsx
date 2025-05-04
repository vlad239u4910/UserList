import { FC } from "react";

type SuccessProps = {
  count: number;
};

export const Success: FC<SuccessProps> = ({ count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button
        className="send-invite-btn"
        onClick={() => window.location.reload()}
      >
        Назад
      </button>
    </div>
  );
};
