import { login } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "./test";

// Login is slow
test.slow();

test("login", login);
