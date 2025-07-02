import { Section, Cell, List, Button } from "@telegram-apps/telegram-ui";
import { useEffect, type FC } from "react";

import { Link } from "@/components/Link/Link.tsx";
import { Page } from "@/components/Page.tsx";
import { initDataState as _initDataState, useSignal } from "@telegram-apps/sdk-react";
import { useUser } from "@/components/UserContext";

const tg = (window as any).Telegram?.WebApp;

export const IndexPage: FC = () => {
  const initDataState = useSignal(_initDataState);
  const { setUser } = useUser();

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await fetch("http://209.38.220.225:8080/api/auth", {
          method: "POST",
          body: JSON.stringify({
            id: initDataState?.user?.id || '',
            username: initDataState?.user?.username || '',
            first_name: initDataState?.user?.first_name || '',
            last_name: initDataState?.user?.last_name || '',
          }),
        });
        const data = await response.json();
        console.log(data, 'success');
      } catch (error) {
        console.log(error, 'error');
      }
    };
    if (initDataState?.user) {
      setUser(initDataState.user);
      auth();
    }
  }, [initDataState, setUser]);

  const onClose = () => {
    tg?.close();
  };

  return (
    <Page back={false}>
      <List>
        <Section header="Features">
          <Link to="/todo">
            <Cell subtitle="Простой список задач (todo)">Todo</Cell>
          </Link>
        </Section>
        <Section header="Application Launch Data">
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
          </Link>
        </Section>
        <Button onClick={onClose} style={{ marginTop: 20, marginLeft: 20 }} size="m">
          Close App
        </Button>
      </List>
    </Page>
  );
};
