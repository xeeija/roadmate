using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class Notification_Route_optional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Route_RouteId",
                table: "Notification");

            migrationBuilder.AlterColumn<Guid>(
                name: "RouteId",
                table: "Notification",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Route_RouteId",
                table: "Notification",
                column: "RouteId",
                principalTable: "Route",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Route_RouteId",
                table: "Notification");

            migrationBuilder.AlterColumn<Guid>(
                name: "RouteId",
                table: "Notification",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Route_RouteId",
                table: "Notification",
                column: "RouteId",
                principalTable: "Route",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
