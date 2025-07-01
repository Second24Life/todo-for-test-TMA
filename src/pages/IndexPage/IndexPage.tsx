import { Section, Cell, List, Button } from "@telegram-apps/telegram-ui";
import type { FC } from "react";

import { Link } from "@/components/Link/Link.tsx";
import { Page } from "@/components/Page.tsx";

const tg = (window as any).Telegram?.WebApp;

export const IndexPage: FC = () => {
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
