import * as React from "react";

interface ShowWhenProps {
  condition: boolean;
  children: React.ReactNode;
}

interface ShowElseProps {
  children: React.ReactNode;
}

export const Show = {
  When: ({ condition, children }: ShowWhenProps) => {
    const childrenArray = React.Children.toArray(children);

    let elseChild: React.ReactElement<ShowElseProps> | undefined;
    const mainChildren: React.ReactNode[] = [];

    childrenArray.forEach((child) => {
      if (
        React.isValidElement<ShowElseProps>(child) &&
        child.type === Show.Else
      ) {
        elseChild = child;
      } else {
        mainChildren.push(child);
      }
    });

    return <>{condition ? mainChildren : elseChild?.props.children ?? null}</>;
  },

  Else: ({ children }: ShowElseProps) => <>{children}</>,
};
