CREATE TABLE `bookings` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`courtId` varchar(64) NOT NULL,
	`date` varchar(10) NOT NULL,
	`startTime` varchar(5) NOT NULL,
	`endTime` varchar(5) NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
	`notes` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courts` (
	`id` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`isActive` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `courts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_courtId_courts_id_fk` FOREIGN KEY (`courtId`) REFERENCES `courts`(`id`) ON DELETE no action ON UPDATE no action;