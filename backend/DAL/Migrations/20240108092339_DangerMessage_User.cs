using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class DangerMessage_User : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "DangerMessage",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_DangerMessage_UserId",
                table: "DangerMessage",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DangerMessage_User_UserId",
                table: "DangerMessage",
                column: "UserId",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DangerMessage_User_UserId",
                table: "DangerMessage");

            migrationBuilder.DropIndex(
                name: "IX_DangerMessage_UserId",
                table: "DangerMessage");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DangerMessage");
        }
    }
}
