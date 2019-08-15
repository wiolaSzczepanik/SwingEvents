package com.swingevents.SwingEvents.images;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="event_images")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventImages {

    @Id
    private Integer id;

    @Lob
    private byte[] main;

}
