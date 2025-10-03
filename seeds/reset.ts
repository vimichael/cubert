import { db } from "../lib/db";

db.prepare("drop table posts").run();
db.prepare("drop table user_algorithms").run();
db.prepare("drop table user_practice_logs").run();
db.prepare("drop table users").run();
db.prepare("drop table algorithms").run();
