CREATE TABLE "group_members" (
	"group_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "group_members_group_id_user_id_pk" PRIMARY KEY("group_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "group_messages" (
	"id_msgr" serial PRIMARY KEY NOT NULL,
	"text" varchar(1000) NOT NULL,
	"sender_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"status" varchar(20) DEFAULT 'sent' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"image_url" varchar(500),
	"audio_url" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "groupes" (
	"id_group" serial PRIMARY KEY NOT NULL,
	"nom" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id_msg" serial PRIMARY KEY NOT NULL,
	"text" varchar(1000) NOT NULL,
	"sender_id" integer NOT NULL,
	"receveur_id" integer NOT NULL,
	"status" varchar(20) DEFAULT 'sent' NOT NULL,
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
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_groupes_id_group_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groupes"("id_group") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_id_users_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id_user") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_messages" ADD CONSTRAINT "group_messages_sender_id_users_id_user_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id_user") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_messages" ADD CONSTRAINT "group_messages_group_id_groupes_id_group_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groupes"("id_group") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_user_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receveur_id_users_id_user_fk" FOREIGN KEY ("receveur_id") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;