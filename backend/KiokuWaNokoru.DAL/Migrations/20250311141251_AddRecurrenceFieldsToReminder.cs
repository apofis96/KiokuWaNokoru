using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KiokuWaNokoru.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddRecurrenceFieldsToReminder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRecurring",
                table: "Reminders",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "NextFireAt",
                table: "Reminders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "RecurrenceType",
                table: "Reminders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RecurrenceValue",
                table: "Reminders",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRecurring",
                table: "Reminders");

            migrationBuilder.DropColumn(
                name: "NextFireAt",
                table: "Reminders");

            migrationBuilder.DropColumn(
                name: "RecurrenceType",
                table: "Reminders");

            migrationBuilder.DropColumn(
                name: "RecurrenceValue",
                table: "Reminders");
        }
    }
}
