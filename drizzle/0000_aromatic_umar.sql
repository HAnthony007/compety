CREATE TABLE "messages" (
	"id_msg" serial PRIMARY KEY NOT NULL,
	"text" varchar(1000) NOT NULL,
	"sender_id" integer NOT NULL,
	"receveur_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_user_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"photo" varchar(255),
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_user_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receveur_id_users_id_user_fk" FOREIGN KEY ("receveur_id") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;