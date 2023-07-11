// Library Imports
import React, { useState } from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Locked,
  Unlocked,
  Row,
  Pending,
  Route,
  Asset,
  Balances,
  PendingWrapper,
  PendingSpacer,
  Balance,
  Arrow,
  ShortRow,
} from "./styles";
import Dots from "../_animations/dots";
import { Ticker } from "shared/reducers/types";

const Cell = ({
  tokenName,
  ticker,
  price,
  value,
  fullwidth,
  totalBalance,
  lockedBalance,
  unlockedBalance,
  showPrivateDetails,
}) => {
  const [open, openBalance] = useState(false);
  const balance = totalBalance * price;
  const hiddenBalance = "-/-";

  const displayBalance = (balance) => {
    return showPrivateDetails ? balance : hiddenBalance;
  };

  return (
    <>
      {lockedBalance === 0 ? (
        <Container>
          <Unlocked to={`/wallet/assets/${ticker}`}>
            <Column>
              <Row>
                <Asset>
                  <Title>{tokenName}</Title>
                </Asset>
                <Balance>
                  {price === 0 ? (
                    <ShortRow>
                      $ <Dots />
                    </ShortRow>
                  ) : (
                    `${"$" + displayBalance(value.unlockedBalance.toFixed(2))}`
                  )}
                </Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {totalBalance === 0 ? displayBalance("0.00") : displayBalance(totalBalance)}
                </Subtitle>
                <Subtitle>
                  {price === 0 ? (
                    <Row>
                      $ <Dots />
                    </Row>
                  ) : ticker === Ticker.ZEPHRSV ? (
                    `${displayBalance(price.toFixed(2)) + " ZEPH"}`
                  ) : (
                    `${"$" + displayBalance(price.toFixed(2))}`
                  )}
                </Subtitle>
              </Row>
            </Column>
            <Route>
              <Arrow />
            </Route>
          </Unlocked>
        </Container>
      ) : (
        <Container>
          <Locked to={`/wallet/assets/${ticker}`}>
            <Column>
              <Row>
                <Asset>
                  <Title>{tokenName}</Title>
                </Asset>
                <Balance>{"$" + displayBalance(balance.toFixed(2))}</Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {displayBalance(totalBalance)}
                </Subtitle>
                <Subtitle>{"$" + displayBalance(price.toFixed(2))}</Subtitle>
              </Row>
            </Column>
            <Route>
              <Arrow />
            </Route>
          </Locked>
          {open && (
            <PendingWrapper to={`/wallet/assets/${ticker}`}>
              <PendingSpacer />
              <Pending>
                <Subtitle>Total Balance</Subtitle>
                <Subtitle>{displayBalance(totalBalance)}</Subtitle>
              </Pending>
              <Pending>
                <Subtitle>Locked Balance</Subtitle>
                <Subtitle>{displayBalance(lockedBalance)}</Subtitle>
              </Pending>
              <Pending>
                <Subtitle>Unlocked Balance</Subtitle>
                <Subtitle>{displayBalance(unlockedBalance)}</Subtitle>
              </Pending>
              <PendingSpacer />
            </PendingWrapper>
          )}
          <Balances onClick={() => openBalance(!open)}>
            <Row>
              <Subtitle>{open ? "Hide Pending Balances" : "Show Pending Balances"}</Subtitle>
            </Row>
          </Balances>
        </Container>
      )}
    </>
  );
};

export default Cell;
