import { StackHandler } from "@stackframe/stack";

export const GET = StackHandler({
  handlers: {
    getUser: async (user) => {
      return { user };
    },
  },
});
