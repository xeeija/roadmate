using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");

            migrationBuilder.CreateTable(
                name: "DangerCategory",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangerCategory", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    IsBanned = table.Column<bool>(type: "boolean", nullable: false),
                    NotificationAllowed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Danger",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Lat = table.Column<double>(type: "double precision", nullable: false),
                    Lon = table.Column<double>(type: "double precision", nullable: false),
                    AddressName = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    OtherCategory = table.Column<string>(type: "text", nullable: true),
                    ActiveAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Danger", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Danger_DangerCategory_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "DangerCategory",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExpertRequest",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApprovedUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpertRequest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ExpertRequest_User_ApprovedUserId",
                        column: x => x.ApprovedUserId,
                        principalTable: "User",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ExpertRequest_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Route",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FromLat = table.Column<double>(type: "double precision", nullable: false),
                    FromLon = table.Column<double>(type: "double precision", nullable: false),
                    ToLat = table.Column<double>(type: "double precision", nullable: false),
                    ToLon = table.Column<double>(type: "double precision", nullable: false),
                    FromAddressName = table.Column<string>(type: "text", nullable: true),
                    ToAddressName = table.Column<string>(type: "text", nullable: true),
                    NotificationEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Route", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Route_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DangerMessage",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Message = table.Column<string>(type: "text", nullable: false),
                    DangerId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReferencedMessageId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangerMessage", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DangerMessage_DangerMessage_ReferencedMessageId",
                        column: x => x.ReferencedMessageId,
                        principalTable: "DangerMessage",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_DangerMessage_Danger_DangerId",
                        column: x => x.DangerId,
                        principalTable: "Danger",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DangerRequest",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    DangerId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangerRequest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DangerRequest_Danger_DangerId",
                        column: x => x.DangerId,
                        principalTable: "Danger",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DangerRequest_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    ReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    RouteId = table.Column<Guid>(type: "uuid", nullable: false),
                    DangerId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Notification_Danger_DangerId",
                        column: x => x.DangerId,
                        principalTable: "Danger",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notification_Route_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Route",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notification_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Danger_CategoryId",
                table: "Danger",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_DangerMessage_DangerId",
                table: "DangerMessage",
                column: "DangerId");

            migrationBuilder.CreateIndex(
                name: "IX_DangerMessage_ReferencedMessageId",
                table: "DangerMessage",
                column: "ReferencedMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_DangerRequest_DangerId",
                table: "DangerRequest",
                column: "DangerId");

            migrationBuilder.CreateIndex(
                name: "IX_DangerRequest_UserId",
                table: "DangerRequest",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpertRequest_ApprovedUserId",
                table: "ExpertRequest",
                column: "ApprovedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpertRequest_UserId",
                table: "ExpertRequest",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_DangerId",
                table: "Notification",
                column: "DangerId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_RouteId",
                table: "Notification",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_UserId",
                table: "Notification",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Route_UserId",
                table: "Route",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DangerMessage");

            migrationBuilder.DropTable(
                name: "DangerRequest");

            migrationBuilder.DropTable(
                name: "ExpertRequest");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "Danger");

            migrationBuilder.DropTable(
                name: "Route");

            migrationBuilder.DropTable(
                name: "DangerCategory");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
