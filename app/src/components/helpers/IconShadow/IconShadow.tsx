import Flexbox from "@app/components/layout/Flexbox";
import React from "react";

export const IconShadow = ({ children }: React.PropsWithChildren) => {
  return (
    <Flexbox
      style={{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      {children}
    </Flexbox>
  );
};
