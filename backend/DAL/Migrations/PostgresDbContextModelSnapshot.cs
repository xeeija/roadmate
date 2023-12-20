﻿// <auto-generated />
using System;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAL.Migrations
{
    [DbContext(typeof(PostgresDbContext))]
    partial class PostgresDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "uuid-ossp");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DAL.Entities.Danger", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime?>("ActiveAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("AddressName")
                        .HasColumnType("text");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Lat")
                        .HasColumnType("double precision");

                    b.Property<double>("Lon")
                        .HasColumnType("double precision");

                    b.Property<string>("OtherCategory")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ResolvedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.HasIndex("CategoryId");

                    b.ToTable("Danger");
                });

            modelBuilder.Entity("DAL.Entities.DangerCategory", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.ToTable("DangerCategory");
                });

            modelBuilder.Entity("DAL.Entities.DangerMessage", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DangerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("ReferencedMessageId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.HasIndex("DangerId");

                    b.HasIndex("ReferencedMessageId");

                    b.ToTable("DangerMessage");
                });

            modelBuilder.Entity("DAL.Entities.DangerRequest", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("DangerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Lat")
                        .HasColumnType("double precision");

                    b.Property<double>("Lon")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DangerId");

                    b.HasIndex("UserId");

                    b.ToTable("DangerRequest");
                });

            modelBuilder.Entity("DAL.Entities.DangerResolveRequest", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DangerId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("DangerId");

                    b.HasIndex("UserId");

                    b.ToTable("DangerResolveRequest");
                });

            modelBuilder.Entity("DAL.Entities.ExpertRequest", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime?>("ApprovedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("ApprovedUserId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("ApprovedUserId");

                    b.HasIndex("UserId");

                    b.ToTable("ExpertRequest");
                });

            modelBuilder.Entity("DAL.Entities.Notification", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DangerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ReadAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("RouteId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("DangerId");

                    b.HasIndex("RouteId");

                    b.HasIndex("UserId");

                    b.ToTable("Notification");
                });

            modelBuilder.Entity("DAL.Entities.Route", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FromAddressName")
                        .HasColumnType("text");

                    b.Property<double>("FromLat")
                        .HasColumnType("double precision");

                    b.Property<double>("FromLon")
                        .HasColumnType("double precision");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("NotificationEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("ToAddressName")
                        .HasColumnType("text");

                    b.Property<double>("ToLat")
                        .HasColumnType("double precision");

                    b.Property<double>("ToLon")
                        .HasColumnType("double precision");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Route");
                });

            modelBuilder.Entity("DAL.Entities.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsBanned")
                        .HasColumnType("boolean");

                    b.Property<bool>("NotificationAllowed")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("DAL.Entities.Danger", b =>
                {
                    b.HasOne("DAL.Entities.DangerCategory", "Category")
                        .WithMany("Dangers")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("DAL.Entities.DangerMessage", b =>
                {
                    b.HasOne("DAL.Entities.Danger", "Danger")
                        .WithMany("Messages")
                        .HasForeignKey("DangerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.DangerMessage", "ReferencedMessage")
                        .WithMany("Answers")
                        .HasForeignKey("ReferencedMessageId");

                    b.Navigation("Danger");

                    b.Navigation("ReferencedMessage");
                });

            modelBuilder.Entity("DAL.Entities.DangerRequest", b =>
                {
                    b.HasOne("DAL.Entities.DangerCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.Danger", "Danger")
                        .WithMany("Requests")
                        .HasForeignKey("DangerId");

                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany("DangerRequests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Danger");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.DangerResolveRequest", b =>
                {
                    b.HasOne("DAL.Entities.Danger", "Danger")
                        .WithMany("ResolveRequests")
                        .HasForeignKey("DangerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany("DangerResolveRequests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Danger");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.ExpertRequest", b =>
                {
                    b.HasOne("DAL.Entities.User", "ApprovedUser")
                        .WithMany("ApprovedExpertRequests")
                        .HasForeignKey("ApprovedUserId");

                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany("ExpertRequests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApprovedUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.Notification", b =>
                {
                    b.HasOne("DAL.Entities.Danger", "Danger")
                        .WithMany("Notifications")
                        .HasForeignKey("DangerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.Route", "Route")
                        .WithMany("Notifications")
                        .HasForeignKey("RouteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Danger");

                    b.Navigation("Route");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.Route", b =>
                {
                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.Danger", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("Notifications");

                    b.Navigation("Requests");

                    b.Navigation("ResolveRequests");
                });

            modelBuilder.Entity("DAL.Entities.DangerCategory", b =>
                {
                    b.Navigation("Dangers");
                });

            modelBuilder.Entity("DAL.Entities.DangerMessage", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("DAL.Entities.Route", b =>
                {
                    b.Navigation("Notifications");
                });

            modelBuilder.Entity("DAL.Entities.User", b =>
                {
                    b.Navigation("ApprovedExpertRequests");

                    b.Navigation("DangerRequests");

                    b.Navigation("DangerResolveRequests");

                    b.Navigation("ExpertRequests");

                    b.Navigation("Notifications");
                });
#pragma warning restore 612, 618
        }
    }
}
