using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class Update_DangerRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DangerRequest_Danger_DangerId",
                table: "DangerRequest");

            migrationBuilder.AlterColumn<Guid>(
                name: "DangerId",
                table: "DangerRequest",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "DangerRequest",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "DangerRequest",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "DangerRequest",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lon",
                table: "DangerRequest",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_DangerRequest_CategoryId",
                table: "DangerRequest",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_DangerRequest_DangerCategory_CategoryId",
                table: "DangerRequest",
                column: "CategoryId",
                principalTable: "DangerCategory",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DangerRequest_Danger_DangerId",
                table: "DangerRequest",
                column: "DangerId",
                principalTable: "Danger",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DangerRequest_DangerCategory_CategoryId",
                table: "DangerRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DangerRequest_Danger_DangerId",
                table: "DangerRequest");

            migrationBuilder.DropIndex(
                name: "IX_DangerRequest_CategoryId",
                table: "DangerRequest");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "DangerRequest");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "DangerRequest");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "DangerRequest");

            migrationBuilder.DropColumn(
                name: "Lon",
                table: "DangerRequest");

            migrationBuilder.AlterColumn<Guid>(
                name: "DangerId",
                table: "DangerRequest",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DangerRequest_Danger_DangerId",
                table: "DangerRequest",
                column: "DangerId",
                principalTable: "Danger",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
